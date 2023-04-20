import { useState } from 'react'

const Statistics = (props) => {
  console.log(props.props)
  return(
    <table>
    <tbody>
      <StatisticLine text="good" value={props.props[0].good}/>
      <StatisticLine text="neutral" value={props.props[1].neutral} />
      <StatisticLine text="bad" value={props.props[2].bad} />
      <StatisticLine text="all" value={props.props[4].sum1} />
      <StatisticLine text="average" value={props.props[5].sum2} />
      <StatisticLine text="positive" value={props.props[6].percent} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  console.log(props)
  if (props.value !=0){
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  
  /*return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )*/
  )}
  }

const Button=(props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  let sum = good + bad *-1
  let sum1= good+neutral+bad
  let sum2 = sum/sum1
  let percent = good/sum1*100

  let array = [{good}, {neutral}, {bad}, {sum}, {sum1}, {sum2}, {percent}]
  console.log(array)

  return (
    <div>
      <h1 style={{fontWeight:'bold'}}>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text='good'/>
      <Button handleClick={()=>setNeutral(neutral+1)} text='neutral'/>
      <Button handleClick={()=>setBad(bad+1)} text='bad'/>
      <br></br>
      <h1 style={{fontWeight:'bold'}}>statistics</h1>
      {good === 0 && neutral===0 && bad===0
        ?<p>No feedback given</p>
        : <Statistics props={array}/>
      }
    </div>
  )
}

export default App