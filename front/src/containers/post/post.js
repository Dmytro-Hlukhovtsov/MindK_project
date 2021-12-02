import {ShowPost} from "../../components/post/post";

export function PostContainer({logo, username, tag, text, timestamp, retweet, likes}){

    const headerVars = {
        logo: logo,
        username: username,
        tag:tag
    }

    const bodyVars = {
        text: text,
        timestamp: timestamp
    }

    const footerVars = {
        retweet: retweet,
        likes: likes
    }

    return <ShowPost header={headerVars} body={bodyVars} footer={footerVars} />
}