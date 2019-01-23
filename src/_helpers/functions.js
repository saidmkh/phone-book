export function changeStateValue(e) {
  return (
    this.setState({ [e.target.name]: e.target.value })
  )
}

export function modalToggle(e) {
  return (
    this.setState({ [e.target.name]: e.target.value })
  )
}