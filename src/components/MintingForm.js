import React,{useState} from 'react'
import Button from '@mui/material/Button';
import { blobToBase64 } from '../blobToBase64';

function MintingForm({mintFunction}) {
    const [imageName,setImageName] = useState('');
    const [image,setImage] = useState(null);
    const [error,setError] = useState('');
    const uploadImage = (event)=>{
       // setImage(event.target.files[0])
       // setImageName(event.target.files[0].name);
       setImageName(event.target.value);

    }
    const localMint = async()=>{
        //let tempImgurl = await blobToBase64(image);
        
        console.log(imageName);
        mintFunction(imageName);
        setImageName('');
        setImage(null);
        setError('');
    


      
      
    }
  return (
    <div style={{textAlign:"center",marginTop:"2rem"}}>
        {/* <input type="file" accept='image/*' id="image-upload" hidden onChange={(e)=>uploadImage(e)}/>
            <label htmlFor='image-upload' style={{padding:"0.35rem 2rem ",cursor:"pointer",borderRadius:"10px",backgroundColor:"#353535",color:"white"}}>
                    Upload Image
            </label> */}
             <input style={{width:"400px",padding:"0.25rem 0.75rem"}} value={imageName} placeholder="Enter image path k1,k2..k11" type="text" onChange={(e)=>uploadImage(e)}/>
            
        {/* <br/> {imageName && imageName} */}
            <br/>{error && error}
        <br/>   
        <Button onClick={()=>localMint()} disabled={!imageName} variant="contained" style={{marginTop:"0.5rem"}}>Mint</Button>
        </div>
  )
}

export default MintingForm