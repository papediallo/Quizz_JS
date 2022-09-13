// gatting all rquired
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box ");
const exit_btn  = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");



const option_list = document.querySelector(".option_list");


let index = 0;


// si le quiz commence le buuton
start_btn.onclick = ()=>
{
    info_box.classList.add("activeInfo") // montrer info box
}
// if exit button
exit_btn.onclick = ()=>
{
    info_box.classList.remove("activeInfo") // hide info box
}
// continue button clicqué
continue_btn.onclick = ()=>
{
    info_box.classList.remove("activeInfo") // hide info box
    quiz_box.classList.add("activeQuiz") // show the quiz
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}


let  que_count =0;
let que_num = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".resultat_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>
{
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeResult");
    let que_count =0;
    let que_num = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_num);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left"

}

quit_quiz.onclick = ()=>
{
    window.location.reload();
}

// if next question clicked
next_btn.onclick = () =>
{
    if(que_count < questions.length -1)
    {
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left"
    }else{ 
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("questions completed"); 
        showResultBox();
} 
    
}

function queCounter(index)
{
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuestions = '<span><p>'+index+'</p><p>of</p><p>'+questions.length+'</p><p>Questions</p></span>';
    bottom_ques_counter.innerHTML = totalQuestions;
}


// getting questions and options from array
function showQuestions(index)
{
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+questions[index].numb+"."+questions[index].question+'</span>';
    let option_tag = '<div class="option"><span>'+questions[index].options[0]+'</span></div>'
                    + '<div class="option"><span>'+questions[index].options[1]+'</span></div>'
                    + '<div class="option"><span>'+questions[index].options[2]+'</span></div>'
                    + '<div class="option"><span>'+questions[index].options[3]+'</span></div>';
    que_text.innerHTML= que_tag; 
    option_list.innerHTML= option_tag;
  
    const option =  option_list.querySelectorAll(".option")
    for(let i = 0 ; i < option.length ; i++)
    {
        // Element.setAttribute(name, value);
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check" >✔</i></div>' ;
let crossIcon = '<div class="icon cross"><i class="fas fa-times">✘</i></div>' ;

function optionSelected(answer)
{
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(correctAns == userAns)
    {
        userScore++;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }else {
        answer.classList.add("incorrect"); 
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);
        // if answers is incorrect 
        for(let i = 0 ; i < allOptions ; i++)
        {
        // Element.setAttribute(name, value);
        if(option_list.children[i].textContent== correctAns)
        {   
            option_list.children[i].setAttribute("class","option correct");
            option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
        }
            
        }
     }

    for(let i = 0 ; i < allOptions ; i++)
    {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox()
{
    info_box.classList.remove("activeInfo"); // hide info box
    quiz_box.classList.remove("activeQuiz"); // show the quiz
    result_box.classList.add("activeResult"); // show the result
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3)
    {
        let scoreTag  = '<span> <p>and congrats, You got  </p>'+userScore+'</p> out of  <p>'+questions.length+'</p></span>' ; 
        scoreText.innerHTML = scoreTag;
    }else if (userScore > 1 && userScore <=3 )
    {
        let scoreTag  = '<span> <p>and nice, You got  </p><p>'+userScore+'</p><p>out of </p> <p>'+questions.length+'</p></span>' ; 
        scoreText.innerHTML = scoreTag;
    }else
    {
        let scoreTag  = '<span> <p>and sorry, You got only </p><p>'+userScore+'</p><p>out of </p> <p>'+questions.length+'</p></span>' ; 
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(time)
{
    counter = setInterval(timer, 1000);
    function timer()
    {
        timeCount.textContent = time;
        time--;
        if(time <9)
        {
            let addZero = timeCount.textContent;
            timeCount.textContent= "0"+addZero;
        }
        if(time < 0)
        {
            clearInterval(counter);
            timeCount.textContent  = "00";
            timeOff.textContent = "Time off"

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0 ; i < allOptions ; i++)
            {
            // Element.setAttribute(name, value);
                if(option_list.children[i].textContent== correctAns)
                {   
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                }
                
            }
            for(let i = 0 ; i < allOptions ; i++)
            {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
                    

        }
    }
}

function startTimerLine(time)
{
    counterLine = setInterval(timer, 29);
    function timer()
    {
        time++;
        timeLine.style.width = time + "px" ;
        if(time > 549)
        {
        clearInterval(counterLine);
        }
    }
}



