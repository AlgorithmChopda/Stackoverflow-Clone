import React from 'react'

const ProfileBio = ({currentProfile}) => {
    return (
        <div>
            <div>
                {   
                    currentProfile?.loc === "-1" ? <h3> Location : Not Set </h3> : <><h3> Location : </h3> <p> {currentProfile?.loc} </p>       </>
                }

                {
                    currentProfile?.tags.length !== 0 ? (
                        <> <br />
                            <h4>Tags watched</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))
                            }
                        </>
                    ) : (
                        <p>0 tags watched</p>
                    )
                }
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <><br />
                            <h4>About</h4>
                            <p>{currentProfile?.about}</p>
                        </>
                    ) : (
                        <p>No bio found</p>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileBio