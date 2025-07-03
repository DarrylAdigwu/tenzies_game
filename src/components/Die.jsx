
export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  return (
      <button 
        style={styles} 
        onClick={() => props.holdDice(props.id)}
        aria-pressed={props.isHeld}
        aria-label={`This die has a value of ${props.value} and is, ${props.isHeld ? "held" : "not held"}`}
      >
        {props.value}
        </button>
  )
}