const Notification = ({ notificationData }) => {
  if (notificationData !== null) {
    if (notificationData.type === 'success') {
      return (
        <div className='notification success-notification-color'>{notificationData.message}</div>
      )
    }
    if (notificationData.type === 'failure') {
      return (
        <div className='notification failure-notification-color'>{notificationData.message}</div>
      )
    }
  }
}

export default Notification