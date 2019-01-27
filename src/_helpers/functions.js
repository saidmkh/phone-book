import { phoneBookStorage } from '../config/firebase'

export function changeStateValue(e) {
  return (
    this.setState({ [e.target.name]: e.target.value })
  )
}

export function uploadPhoto(image, progress) {
  const uploadImage = phoneBookStorage.ref(`images/${image.name}`).put(image);
  uploadImage.on('state_changed',
    snapshot => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({ progress });
    },
    err => {
      console.log(err)
    },
    () => {
      phoneBookStorage.ref('images').child(image.name).getDownloadURL()
        .then(url => {
          this.setState({
            photoUrl: url
          })
        })
    }
  )
}