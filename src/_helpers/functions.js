export function changeStateValue(e) {
  return (
    this.setState({ [e.target.name]: e.target.value })
  )
}