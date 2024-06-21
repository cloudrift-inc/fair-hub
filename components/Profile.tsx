import {useState, useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import {fetchProfile, ProfileData} from "./ProfileFetch";


const Profile: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [error, setError] = useState<string>("");
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const fetchProfileData = async (token: string): Promise<ProfileData> => {
        try {
            return await fetchProfile(token);
        } catch (error: any) {
            throw new Error(`Failed to fetch profile data: ${error.message}`);
        }
    };
    const mutation = useMutation<ProfileData, Error, string>({
        mutationFn: fetchProfileData,
        onSuccess: (data) => {
            console.log("Profile fetched successfully:", data);
            setProfile(data);
        },
        onError: (error) => {
            setError(error.message);
            console.error("Error fetching profile:", error);
        },
    });

    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        if (token) {
            mutation.mutate(token);
        } else {
            console.error("No auth token found");
            setError("Please Log In to access this page.");
        }
    }, []);


    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mx-auto rounded-lg bg-[#111111] bg-grain pb-1 shadow-md">
            <div className="flex items-center justify-between p-5 ">
                <div className="flex items-center space-x-2">
                    <AccountCircleIcon
                        className="text-white"
                        style={{fontSize: "2rem"}}
                    />
                    <h2 className="ml-6 text-large font-medium text-white">
                        Profile Overview
                    </h2>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setOpen(!open)}>
                        {open ? (
                            <ExpandLessIcon className="text-white"/>
                        ) : (
                            <ExpandMoreIcon className="text-white"/>
                        )}
                    </button>
                </div>
            </div>
            {open && (
                <>
                    <hr className="mb-3 mt-0 w-full border-black"/>
                    <div className="ml-6 flex items-start rounded-lg p-6 pb-8 pt-2">
                        <div className="w-full">
                            <div className="grid grid-cols-2 gap-6 text-white">
                                <div className="space-y-6">
                                    <div className="flex flex-col">
                                        <label className="text-lg font-bold text-white">Name</label>
                                        <p className="text-lg text-stone-300">
                                            {" "}
                                            {profile ? profile.name : ""}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-lg font-bold text-white">
                                            Email ID
                                        </label>
                                        <p className="text-lg text-stone-300">
                                            {" "}
                                            {profile ? profile.email : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
