import isEmpty from './isEmpty'

const inputValidate = data => {
  const fullname_regex = /^[a-z ,.'-]+$/i
  const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const phone_regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
  let errors = {}

  data.fullname = !isEmpty(data.fullname) ? data.fullname : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.company = !isEmpty(data.company) ? data.company : ''
  data.photoUrl = !isEmpty(data.photoUrl) ? data.photoUrl : ''

  if (!data.fullname.match(fullname_regex)) {
    errors.fullname = 'Name is not valid'
  }

  if (!data.phone.match(phone_regex)) {
    errors.phone = 'length must be 10 symbols and only: numbers, "+", "(/)"'
  }

  if (!data.email.match(email_regex)) {
    errors.email = 'email is not valid'
  }

  if (data.company.length < 2 && data.company > 50) {
    errors.company = 'Company name must between 2 and 50 symbols'
  }

  return {
    errors,
    validate: isEmpty(errors)
  }
}

export default inputValidate