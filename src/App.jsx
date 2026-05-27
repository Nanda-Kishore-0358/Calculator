import { useState } from "react";

function Calculator(){
  const [text, settext] = useState('0');
  const [operand1, setoperand1] = useState('');
  const [operand2, setoperand2] = useState('');
  const [operator, setoperator] = useState('');
  const [result, setresult] = useState('');
  const [index, setindex] = useState(0);
  const [history, sethistory] = useState([]);
    
    function fun1(ch){
      if(ch == "AC"){
        settext('0');
        setresult('');
        setoperand1('');
        setoperand2('');
        setoperator('');
      }
      else if(ch=='d'){
        let text1 = text.slice(0, text.length - 1);
        settext((text1 == ''|| text1 == '0') ? '0' : text1);
      }

      else if(ch == '+' || ch == '-' || ch == '*' || ch == '/'){
        if(result != ''){
          setoperand1(result);
          setindex(result.length);
          settext(result + ch);
          setresult('');
        }
        else{
          setoperand1(text);
          setindex(text.length);
          settext(text + ch);
        }        
        setoperator(ch);
      }

      else if(ch == '='){
        let op2 = text.slice(index + 1, text.length);
        setoperand2(op2);
        let num = 0;
        let flag = false;
        if(operand1 && (op2==operand2) && operator){
          num = fun2(operand1, operand2, operator); 
          flag = true;
        }
        if(flag){
          setresult(String(num));
          settext(text + " = " + result);
          setTimeout(() => {
            sethistory(history => [...history, (text + " = " + String(num))]);
          }, 1000);
          
        }
        
      }

      else if(ch == "C"){
        settext('0');
        setresult('')
        setoperand1(result);
        setoperand2('');
        setoperator('');
      }

      else{
        if(text == '0'){
          settext(ch);
        }
        else{
          settext(text+ch);
        }
      }
    }

    

    function fun2(operand1, operand2, operator){
      let oper1 = Number(operand1);
      let oper2 = Number(operand2);
      switch(operator){
        case '+':
          return oper1 + oper2
        case '-':
          return oper1 - oper2
        case '*':
          return oper1 * oper2
        case '/':
          return oper1 / oper2
      }
    }

    function clearHistory(){
      sethistory([]);
    }


    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="calculator col-6">
            <div className="screen">
            <p className="mx-4 p1"><big>{text}</big></p>
            <br /><br />
            <p className="p2">{result}</p>
          </div>
          <div className="row m-2">
            <div className="col">
              <button className="btn btn-primary mx-2" onClick={() => fun1('1')}>1</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('2')}>2</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('3')}>3</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('+')}>+</button>
            </div>
          </div>
          <div className="row m-2">
            <div className="col">
              <button className="btn btn-primary mx-2" onClick={() => fun1('4')}>4</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('5')}>5</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('6')}>6</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('-')}>-</button>
            </div>
          </div>

          <div className="row m-2">
            <div className="col">
              <button className="btn btn-primary mx-2" onClick={() => fun1('7')}>7</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('8')}>8</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('9')}>9</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('*')}>*</button>
            </div>
          </div>

          <div className="row m-2">
            <div className="col">
              <button className="btn btn-primary mx-2" onClick={() => fun1('0')}>0</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('/')}>/</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('=')}>=</button>
              <button className="btn btn-primary mx-2" onClick={() => fun1("AC")}>AC</button>
            </div>
          </div>

          <div className="row m-2">
            <div className="col">
              <button className="btn btn-primary mx-2" onClick={() => fun1("C")}>C </button>
              <button className="btn btn-primary mx-2" onClick={() => fun1('d')}><i className="bi bi-backspace-fill"></i></button>
              <button className="btn btn-primary mx-2 w-3" onClick={() => clearHistory()}><i className="bi bi-clock-history"></i></button>
            </div>
          </div>
          </div>
          <div className="history col-6 text-light m-4">
            <div className="col">
              <h3>Calculator History</h3>
              <hr />
              {history.length === 0? <p>No History yet</p> : (
                history.map((c,i) => (
                <div key={i}>
                  <h5>{c}</h5>
                  <hr />
                </div>
              ))
              )}
            </div>
          </div>
          </div>
          
        </div>
      </div>
    );
}

export default Calculator;