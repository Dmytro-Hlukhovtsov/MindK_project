import {FormDate} from "../../../containers/post/postContainers/postData";

export function PostBody({text="Default Text", timestamp=""}){
    return(
        <div className="postBody">
            <p className="text">{text}</p>
            <FormDate timestamp={timestamp} />
        </div>
    )
}