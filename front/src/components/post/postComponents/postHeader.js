export function PostHeader({logo, username = "default", tag = "default"}){
    console.log({username})
    return(
        <div className='post-header'>
            <div className='user-block'>
                <img src={logo} alt='avatar'/> 
                <div className='user-names-block'>
                    <p className='username'>{username}</p>
                    <p className='tag'>@{tag}</p>
                </div>
                
            </div>
            <button>Follow</button>
        </div>
    );
}