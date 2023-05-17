import LoginButton from "@/components/login-btn";
import { getServerSession } from "next-auth/next";
import authOptions from "../authOptions";

const Profile = async () => {
    const session = await getServerSession(authOptions)
    console.log('session')
    console.log(session)

    return (
        <div>
            <h1>Login Page</h1>
            <LoginButton />
        </div>
    );
}
 
export default Profile;