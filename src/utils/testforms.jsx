import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function TestForms() {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const testAddVideo = async (e) =>
    {
        e.preventDefault()
        var formdata = new FormData();
        formdata.append("name", e.target.name.value);
        formdata.append("caption", e.target.caption.value);
        formdata.append("cover", e.target.cover.files[0]);
        formdata.append("audio", e.target.audio.files[0]);
        e.target.video ? formdata.append("video", e.target.video.files[0]): formdata.append("video", null)
        formdata.append("genre", e.target.genre.value);
        console.log("testing add video")
        console.log(formdata)
        let response = await fetch('http://62.148.235.159:8000/create_video/', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: formdata
        })
        console.log(response)
    }
    const testAddPost = async (e) =>
    {
        e.preventDefault()
        var formdata = new FormData();
        formdata.append("title", e.target.title.value);
        formdata.append("caption", e.target.caption.value);
        formdata.append("cover", e.target.cover.files[0]);
        console.log("testing add post")
        console.log(formdata)
        let response = await fetch('http://62.148.235.159:8000/create_post/', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: formdata
        })
        console.log(response)
    }
    const testAddComment = async (e) =>
    {
        
        e.preventDefault()
        console.log("testing Add Comment")
        var formdata = new FormData();
        formdata.append("text", e.target.text.value);
        formdata.append("post", e.target.post.value);
        console.log(formdata)
        let response = await fetch('http://62.148.235.159:8000/create_comment/', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: formdata
        })
        console.log(response)
    }
    const testEditVideo = async (e) =>
    {
        e.preventDefault()
        var formdata = new FormData();
        var videoId = e.target.videoId.value;
        formdata.append("name", e.target.name.value);
        formdata.append("caption", e.target.caption.value);
        e.target.cover.value != ""? formdata.append("cover", e.target.cover.files[0]): formdata.append("cover", "")
        e.target.audio.value != ""? formdata.append("audio", e.target.audio.files[0]): formdata.append("audio", "")
        e.target.video.value != ""? formdata.append("video", e.target.video.files[0]): formdata.append("video", "")
        console.log("testing edit video")
        console.log(e.target.video.value == "")
        for (const value of formdata.values()) {
            console.log(value);
          }
        let response = await fetch(`/update_video/${videoId}/`, {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: formdata
        })
        console.log(response)
    }
    const testDeleteVideo = async (e) =>
    {
        e.preventDefault()
        console.log("testing Delete Video")
        var videoId = e.target.video.value;
        let response = await fetch(`http://62.148.235.159:8000/delete_video/${videoId}/`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        console.log(response)
    }
    const testCreateChannel = (e) =>
    {
        e.preventDefault()
        console.log("testing Create Channel")
    }
    const testupdateChannel = (e) =>
    {
        e.preventDefault()
        console.log("testing update Channel")
    }
  return (
    
    <div className="w-4/5 md:w-3/5 mx-auto dark:text-slate-200">
            <div className="h-20  relative">
                
            </div>
            </div>
    
  )
}

export default TestForms