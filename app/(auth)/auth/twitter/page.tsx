import TwitterButton from "./twitter-button"
import { getServerSession } from "next-auth";

export default async function LoginToTwitter() {
	const sessionData = await getServerSession();

	return <TwitterButton sessionData={sessionData}/>
}
