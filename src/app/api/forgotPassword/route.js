import Forgot from "../../models/forgot"

export default async function handler(req, res) {
  // check if the user in the Database
  // Send email to user
  if (req.body.sendMail) {
    let token = `ljdsljslfjldjflksflkjdflkjdlkfjlsdj`;
    let forgot = new Forgot({

    })

    let email = `We have send you this email in response to your request to reset your password on RealEsted.com
  
  To reset your password, please follow the link below:
  
  <a href="https://sprycontentshell.pawanreplit.repl.co/forgotPassword?token=${token}"> Click here to reset your password</a>
  <br/></br>
  we recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account page change your password.`
  }
  else {
    //reset user password
  }

  res.status(200).json({ success: true })
}
