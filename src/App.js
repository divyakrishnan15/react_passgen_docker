import React,{useState,useEffect,useRef} from 'react'
import './App.css';

function App() {
  const[limitInp,setLimitInp]=useState(0)
  const[checkboxInp,setCheckboxInp]=useState([])
  const[pwd,setPwd]=useState('')
  const copyword = useRef()


  const handleChecked=(e)=>{
    setCheckboxInp({...checkboxInp,[e.target.name]:e.target.checked}) 
  }

  useEffect(()=>{
    console.log(checkboxInp)
  },[checkboxInp])

  const copyToClipboard =()=>{
    try{
      navigator.clipboard.writeText(copyword.current.value)
      console.log("success")
    }catch(err){
      console.log(err)
    }
  }
  

  const main_pwd_gen=(e)=>{
            e.preventDefault()
          const genRandChar=(min,max)=>{
                // 65-90  -  A-Z
                // 97-122 -  a-z
                // 48-57  -  0-9
                // 32     -  space
                const limit = (max - min)+1;
                return String.fromCharCode(Math.floor(Math.random() * limit)+min)
          }

          const upperCaseVal=()=>{
            console.log("Uppercase rand = ",genRandChar(65,90))
            return genRandChar(65,90)
          }

          const lowerCaseVal=()=>{
            console.log("Lowercase rand = ",genRandChar(97,122))
            return genRandChar(97,122)
          }

          const numberVal=()=>{
            console.log("Number rand = ",genRandChar(48,57))
            return genRandChar(48,57)
          }

          const symbolVal=()=>{
            const sym = '~!@#$%^&*()_+|}{<>*./'
            console.log("sym_rand = ",sym[Math.floor(Math.random() * sym.length)])
            return sym[Math.floor(Math.random() * sym.length)]
          }



          const limit = limitInp

          let generatedPassword = ""
          for (let i=0;i<limit;i++){

                const pwdgen_func_array = [
                  {
                    element : document.querySelector('.alpha-uc'),
                    func:upperCaseVal()
                  },
                  {
                    element : document.querySelector('.alpha-lc'),
                    func:lowerCaseVal()
                  },
                  {
                    element : document.querySelector('.num'),
                    func:numberVal()
                  },
                  {
                    element : document.querySelector('.sym'),
                    func:symbolVal()
                  }
                ]


            const arr = pwdgen_func_array.filter((e)=>{
              console.log("EEEE = ",e.element.checked)
              // console.log("FULLL EEE = ",e)
              return e.element.checked === true
            })
            console.log("arrr = ",arr)

            const index=Math.floor(Math.random()*arr.length);
            console.log(index, "= INDEX")
            console.log("ARRAY", arr)
            const letter=arr[index].func;
            generatedPassword+=letter;
          }
            console.log("generatedPassword = ",generatedPassword)
            setPwd(generatedPassword)
  }



  return (
    <div className="App center">
      <div className='passgen-app'>
      <h1>Password Gen App</h1>

      <form id="form-main" >
        <div className='output'>
            <textarea className="final-output" value={pwd} ref={copyword}></textarea>
            <button className='copy-btn' onClick={copyToClipboard}>copy</button>
        </div>

        <h3 className='length'>
             <label>Length : </label>
        </h3>



        <div class="slidecontainer center">
            <div>0</div>
            <input type="range" min="0" max="100" step="10" class="slider" id="myRange" value={limitInp} onChange={(e)=>setLimitInp(e.target.value)}/>
            <div>100</div>
        </div>

        <div>{limitInp}</div>



        <h3>Settings:</h3>
        <div className='settings'>
          
            <input type="checkbox" class="alpha-uc" name="uppercase-chkbox" onChange={handleChecked}  value="uppercase"/>
            <label>Include Uppercase</label>

            
            <input type="checkbox" class="alpha-lc" name="lowercase-chkbox" onChange={handleChecked} value="lowercase"/>
            <label>Include Lowercase</label>

            
            <input type="checkbox" class="num" name="number-chkbox" onChange={handleChecked} value="number"/>
            <label>Include Numbers</label>

            
            <input type="checkbox" class="sym" name="symbol-chkbox" onChange={handleChecked} value="symbol"/>
            <label>Include Symbols</label>  
        </div>

        <button className='pwd-gen-btn' type="submit" onClick={main_pwd_gen}>Generate Password</button>

      </form>
      </div>
    </div>
  );
}

export default App;
