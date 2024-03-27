import connectDb from "../../../../middleware/mongoose";
import property from "../../../../models/property";
import { NextResponse } from "next/server";


export const POST =  connectDb(async function postHandler(request, response){
  const requestBody = await request.text();
  // console.log(requestBody);
  if(requestBody){
    try {
      const requestBodyJSON = JSON.parse(requestBody);
    //   console.log(requestBodyJSON);
      let Property = await property.find({UserEmail: requestBodyJSON})
    //   console.log(Property)
      return NextResponse.json({success: true, Property })
    } catch {
      return NextResponse.json({ error : "Invalid json in the request Body"});
    }
  }
  else {
    return NextResponse.json({ error : "Request body is empty"})
  }

});





// const handler = async (req, res) => {
//     const location = req.body.location;
//     console.log(`getProperty run location ${location}`)
//     let Property = await property.find({city: location})
//     res.status(200).json({Property})
// }

// export default connectDb(handler);