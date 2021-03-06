import isEmpty from './isEmpty'

const inputValidate = data => {
  const fullname_regex = /^[a-zа-я ,.'-]+$/i
  const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const phone_regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
  const company_regex = /^[a-zа-я0-9():*#@№!?=+ ,.'-]+$/i
  let errors = {}

  data.fullname = !isEmpty(data.fullname) ? data.fullname : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.company = !isEmpty(data.company) ? data.company : ''
  data.photoUrl = !isEmpty(data.photoUrl) ? data.photoUrl : ''

  if (!data.fullname.match(fullname_regex)) {
    errors.fullname = 'Name is not valid'
  }

  if (data.fullname.length < 2) {
    errors.fullname = 'between 2 and 60 symbols'
  }

  if (!data.phone.match(phone_regex)) {
    errors.phone = 'only: numbers, "+", "(/)"'
  }

  if (data.phone.length < 10) {
    errors.phone = 'between 10 and 13 symbols'
  }

  if (!data.email.match(email_regex)) {
    errors.email = 'email is not valid'
  }

  if (!data.company.match(company_regex)) {
    errors.email = 'company name is not valid'
  }

  if (data.company.length < 2) {
    errors.company = 'between 2 and 60 symbols'
  }

  return {
    errors,
    validate: isEmpty(errors)
  }
}

export default inputValidate