const D=[...window.DP1,...window.DP2,...window.DP3,...window.DP4,...window.DP5];
// row: [loc,card,emp,delinq,missed,score,util,m1..m6]
const $=id=>document.getElementById(id);
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const uniq=i=>[...new Set(D.map(r=>r[i]))].sort();
const sel={f_loc:0,f_card:1,f_emp:2};
for(const [id,i] of Object.entries(sel)){$(id).innerHTML='<option value="">All</option>'+uniq(i).map(v=>`<option>${v}</option>`).join('')}
const mean=a=>{a=a.filter(x=>x!=null);return a.length?a.reduce((s,x)=>s+x,0)/a.length:0};
const rate=rs=>rs.length?100*mean(rs.map(r=>r[3])):0;
const charts={};
function group(rs,keyFn,order){const m={};rs.forEach(r=>{const k=keyFn(r);if(k==null)return;(m[k]=m[k]||[]).push(r)});
 const keys=order||Object.keys(m).sort();return keys.map(k=>({k,n:(m[k]||[]).length,v:rate(m[k]||[])}))}
function bar(id,g,avg){const ctx=$(id);const data={labels:g.map(x=>`${x.k} (n=${x.n})`),datasets:[{data:g.map(x=>+x.v.toFixed(1)),backgroundColor:g.map(x=>x.v>avg?css('--bad'):css('--ok')),borderRadius:4}]};
 const opt={maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.parsed.y.toFixed(1)+'%'}}},scales:{y:{beginAtZero:true,ticks:{color:css('--mu'),callback:v=>v+'%'},grid:{color:css('--gr')}},x:{ticks:{color:css('--mu'),font:{size:11}},grid:{display:false}}}};
 if(charts[id]){charts[id].data=data;charts[id].options=opt;charts[id].update()}else charts[id]=new Chart(ctx,{type:'bar',data,options:opt})}
const bands=[[300,450,'300–449'],[450,600,'450–599'],[600,750,'600–749'],[750,900,'750+']];
const dtis=[[0,.2,'<20%'],[.2,.3,'20–30%'],[.3,.4,'30–40%'],[.4,9,'40%+']];
const ages=[[18,30,'18–29'],[30,45,'30–44'],[45,60,'45–59'],[60,99,'60+']];
const utils=[[0,.3,'<30%'],[.3,.5,'30–50%'],[.5,.7,'50–70%'],[.7,9,'70%+']];
const bandOf=(v,b)=>{if(v==null)return null;const x=b.find(([lo,hi])=>v>=lo&&v<hi);return x&&x[2]};
function render(){
 const f=[$('f_loc').value,$('f_card').value,$('f_emp').value];
 const rs=D.filter(r=>[0,1,2].every(i=>!f[i]||r[i]===f[i]));
 const all=rate(D),cur=rate(rs);
 $('sub').textContent=`${rs.length} of ${D.length} accounts`;
 $('k1').textContent=rs.length?cur.toFixed(1)+'%':'–';
 $('k1s').textContent=`${rs.filter(r=>r[3]).length} delinquent · portfolio ${all.toFixed(1)}%`;
 $('k2').textContent=mean(rs.map(r=>r[4])).toFixed(2);
 $('k3').textContent=Math.round(mean(rs.map(r=>r[5])))||'–';
 $('k3s').textContent=`delinquent ${Math.round(mean(rs.filter(r=>r[3]).map(r=>r[5])))||'–'} · others ${Math.round(mean(rs.filter(r=>!r[3]).map(r=>r[5])))||'–'}`;
 $('k4').textContent=(100*mean(rs.map(r=>r[6]))).toFixed(0)+'%';
 $('k4s').textContent=`delinquent ${(100*mean(rs.filter(r=>r[3]).map(r=>r[6]))).toFixed(0)}% · others ${(100*mean(rs.filter(r=>!r[3]).map(r=>r[6]))).toFixed(0)}%`;
 bar('c1',group(rs,r=>r[2]),cur);bar('c2',group(rs,r=>r[1]),cur);bar('c3',group(rs,r=>r[0]),cur);
 bar('c4',group(rs,r=>bandOf(r[5],bands),bands.map(b=>b[2])),cur);
 bar('c5',group(rs,r=>bandOf(r[6],utils),utils.map(b=>b[2])),cur);
 bar('c7',group(rs,r=>bandOf(r[14],dtis),dtis.map(b=>b[2])),cur);bar('c8',group(rs,r=>bandOf(r[13],ages),ages.map(b=>b[2])),cur);bar('c9',group(rs,r=>String(r[4]),['0','1','2','3','4','5','6']),cur);
 const st=['On-time','Late','Missed'],col=[css('--ok'),css('--wn'),css('--bad')];
 const ds=st.map((s,i)=>({label:s,backgroundColor:col[i],data:[0,1,2,3,4,5].map(m=>rs.length?+(100*rs.filter(r=>r[7+m]===s).length/rs.length).toFixed(1):0)}));
 const data={labels:['M1','M2','M3','M4','M5','M6'],datasets:ds};
 const opt={maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:css('--mu'),boxWidth:12}}},scales:{x:{stacked:true,ticks:{color:css('--mu')},grid:{display:false}},y:{stacked:true,max:100,ticks:{color:css('--mu'),callback:v=>v+'%'},grid:{color:css('--gr')}}}};
 if(charts.c6){charts.c6.data=data;charts.c6.options=opt;charts.c6.update()}else charts.c6=new Chart($('c6'),{type:'bar',data,options:opt});
}
['f_loc','f_card','f_emp'].forEach(id=>$(id).addEventListener('change',render));
$('reset').onclick=()=>{['f_loc','f_card','f_emp'].forEach(id=>$(id).value='');render()};
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>setTimeout(render,50));
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('on',p.id===b.dataset.p));Object.values(charts).forEach(c=>c.resize())});
render();
