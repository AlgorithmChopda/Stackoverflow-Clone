import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'
import axios from 'axios'

const EditProfileForm = ({ currentUser, setSwitch }) => {

    const [name, setName] = useState(currentUser?.name)
    const [about, setAbout] = useState(currentUser?.about)
    const [tags, setTags] = useState(currentUser?.tags)

    const [location, setLocation] = useState(currentUser?.loc === "-1" ? null: currentUser.loc);
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        var loc = location === null ? "-1" : location;
        if(tags.length === 0) 
            dispatch(updateProfile( currentUser?._id, { name, about, tags: currentUser?.result?.tags, loc}))
        else
            dispatch(updateProfile( currentUser._id, { name, about, tags, loc }))
        
        setSwitch(false)
    }

    const fetchLocation = () => {
        if (!"geolocation" in navigator) {
            alert("Location is Not Supported in this browser");
        }
        
        navigator.geolocation.getCurrentPosition(function(position) {

            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyD51OcSUK4f64fv3yoiVhaMECtf1L6gItU`)
            .then(response => {
                var data = response.data;
                console.log(response.data.results[0]);
                var city = '';
                data.results[0].address_components.forEach(function(element){
                    if(element.types[0] == 'locality' && element.types[1] == 'political')
                    {
                        city = element.long_name;
                    }
                });
                city = response.data.results[0].formatted_address;
                setLocation(city);
            }).catch(error => {
            console.log(error)
            });
        });
    }

    return (
        <div>
            <h1 className='edit-profile-title'>
                Edit Your Profile
            </h1>
            <h2 className="edit-profile-title-2">
                Public information
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>Display name</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="about">
                    <h3>About me</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>Watched tags</h3>
                    <p>Add tags separated by 1 space</p>
                    <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(' '))}/>
                </label><br />
                <label htmlFor="name">
                    <h3>Current Location</h3>
                    <input type="text" value={location === null? "Not-Set": location} id = "1" readOnly/>
                    <button type='button' className='user-cancel-btn' onClick={fetchLocation} >Fetch Location</button>
                    <p className='Note'> ** make sure Permession access is given and device location is on.. **</p>
                </label>
                <br /><br />
                <input type="submit" value='Save profile' className='user-submit-btn'/>
                
                <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProfileForm