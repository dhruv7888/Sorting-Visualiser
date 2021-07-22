document.querySelector('#Sort').addEventListener('click',Sorting);
document.querySelector('#NewArray').addEventListener('click',BarGeneration);
document.querySelector('#Reset').addEventListener('click',RemoveBars);
var n;
var heights=[];
var holder=document.querySelector("#BarsHolder");
var bars=document.querySelector("#BarsHolder").children;
var speed;
var delay_tot=0;
var delay_cur=1;


function BarGeneration()
{
    n=document.querySelector("#arraySiz").value;
    RemoveBars();
    heights=[];
    for(let i = 0 ; i < n ; i++)
    {
        heights.push(parseInt(Math.random()*500)+100);
    }
    for(let height of heights)
    {
        let Bar=document.createElement('div');
        Bar.className="bar";
        Bar.style.height=height+"px";
        Bar.style.width=((90-(n*0.2))/n)+"%";
        holder.appendChild(Bar);
    }
    bars=document.querySelector("#BarsHolder").children;
}

async function BubbleSort()
{
    for(let step=0 ; step < n-1 ; step++)
    {
        for(let j=0;j < n-step-1 ;j++)
        {
            await assign(j,heights[j],"rgb(233, 8, 8)");
            await assign(j+1,heights[j+1],"rgb(233, 8, 8)");
            if(heights[j]>heights[j+1])
            {
                var temp=heights[j+1];
                heights[j+1]=heights[j];
                heights[j]=temp;
                await assign(j,heights[j],"rgb(233, 8, 8)");
                await assign(j+1,heights[j+1],"rgb(233, 8, 8)");
            }
            await assign(j,heights[j],"rgb(45, 87, 224)");
            await assign(j+1,heights[j+1],"rgb(45, 87, 224)");
        }
        await assign(n-step-1,heights[n-step-1],"rgb(175, 48, 214)");
    }
    await assign(0,heights[0],"rgb(175, 48, 214)");
}

async function InsertionSort()
{
    let i, key, j;
    for (i = 1; i < n; i++)
    {
        key = heights[i];
        j = i - 1;
        await assign(i,heights[i],"rgb(233, 8, 8)");   
        while (j >= 0 && heights[j] > key)
        {
            await assign(j,heights[j],"rgb(233, 8, 8)");        
            await assign(j+1,heights[j+1],"rgb(233, 8, 8)");
            let temp=heights[j+1];
            heights[j+1]=heights[j];
            heights[j]=temp;        
            await assign(j,heights[j],"rgb(233, 8, 8)");
            await assign(j+1,heights[j+1],"rgb(233, 8, 8)");
            await assign(j,heights[j],"rgb(175, 48, 214)");
            await assign(j+1,heights[j+1],"rgb(175, 48, 214)");
            j--;        
        }
        heights[j + 1] = key;
        await assign(j+1,heights[j+1],"rgb(175, 48, 214)");
    }                
}

async function Merge(start,mid,end)
{
    let sizel=mid-start+1;
    let sizer=end-mid;
    let arrayl=[],arrayr=[];
    for(let i=0;i<sizel;i++)
    {
        await assign(start+i,heights[start+i],"rgb(233, 8, 8)");
        arrayl.push(heights[start+i]);
    }
    for(let i=0;i<sizer;i++)
    {
        await assign(mid+1+i,heights[mid+1+i],"rgb(233, 8, 8)");
        arrayr.push(heights[mid+1+i]);
    }
    let indexl=0,indexr=0,indexmrg=start;
    while(indexl<sizel && indexr<sizer)
    {
        if(arrayl[indexl]<=arrayr[indexr])
        {
            heights[indexmrg]=arrayl[indexl];
            await assign(indexmrg,heights[indexmrg],"rgb(233, 8, 8)");
            indexl++;    
        }
        else
        {
            heights[indexmrg]=arrayr[indexr];
            await assign(indexmrg,heights[indexmrg],"rgb(233, 8, 8)");
            indexr++;    
        }
        await assign(indexmrg,heights[indexmrg],"rgb(175, 48, 214)");
        indexmrg++;
    }
    while(indexl<sizel)
    {
        heights[indexmrg]=arrayl[indexl];
        await assign(indexmrg,heights[indexmrg],"rgb(175, 48, 214)");
        indexl++;
        indexmrg++;
    }
    while(indexr<sizer)
    {
        heights[indexmrg]=arrayr[indexr];
        indexr++;    
        await assign(indexmrg,heights[indexmrg],"rgb(175, 48, 214)");
        indexmrg++;        
    }
}

async function MergeSort(start,end)
{
    if(start<end)
    {
        let mid=parseInt((start+end)/2);
        await MergeSort(start,mid);
        await MergeSort(mid+1,end);
        await Merge(start,mid,end);
    }
}

function RemoveBars()
{
    holder.innerHTML="";
    heights=[];
}

async function SelectionSort()
{
    for(let i=0;i<n;i++)
    {
        let mini_ind=i;
        await assign(i,heights[i],"rgb(233, 8, 8)");
        for(let j=i+1;j<n;j++)
        {
            await assign(j,heights[j],"rgb(233, 8, 8)");
            if(heights[j]<heights[mini_ind])
            {
                await assign(mini_ind,heights[mini_ind],"rgb(175, 48, 214)");    
                mini_ind=j;
            }        
            else
            {
                await assign(j,heights[j],"rgb(175, 48, 214)");
            }
        }
        let temp=heights[i];
        heights[i]=heights[mini_ind];
        heights[mini_ind]=temp;
        await assign(mini_ind,heights[mini_ind],"rgb(175, 48, 214)");    
        await assign(i,heights[i],"rgb(175, 48, 214)");
    }
}

var buttons = document.querySelectorAll(".buttons");
async function Sorting()
{    
    for(button of buttons)
    {
        button.disabled=true;
    }
    speed=document.querySelector("#speedRange").value;
    delay_cur=(5-speed)*1;
    let Algorithm=document.getElementById("Select").value;
    if(heights.length===0)
    {
        
    }
    else if(Algorithm==="Bubble")
    {
        await BubbleSort();
    }
    else if(Algorithm==="Merge")
    {
        await MergeSort(0,n-1);
    }
    else if(Algorithm==="Selection")
    {
        await SelectionSort();
    }
    else if(Algorithm==="Insertion")
    {
        await InsertionSort();
    }
    for(button of buttons)
    {
        button.disabled=false;
    }
}

function assign(j,height_j,col)
{
    bars[j].style.backgroundColor=col;
    bars[j].style.height=heights[j]+'px';
    return new Promise(resolve =>
    {
        setTimeout(function(){
            resolve();           
        },delay_tot+=delay_cur);
    });
}




