import User from "../database/models/User";
import { IUserSchema } from "../database/models/Schema";
interface IUserServices {

    followInteraction: (interaction: Interaction, followedId: string, followerId: string) => Promise < IFollowReturn >

}
interface IFollowReturn {

    followerUpdate: IUserSchema, 
    followedUpdate: IUserSchema

}

export enum Interaction {

    FOLLOW = 'follow',
    UNFOLLOW = 'unfollow'

}
class UserService implements IUserServices {

    public async followInteraction(interaction: Interaction, followedId: string, followerId: string ): Promise <IFollowReturn> {

        const operation = interaction === "follow" ? '$push' : '$pull'

        try {

            const [followerUpdate, followedUpdate] = await Promise.all([

                await User.findByIdAndUpdate(followerId, { [ operation ]: { follow: followedId } }, { new: true }),
                await User.findByIdAndUpdate(followedId, { [ operation ]: { followers: followerId } }, { new: true })
    
            ])

            return { followerUpdate: followerUpdate, followedUpdate: followedUpdate } as IFollowReturn
            
        } catch (error) {

            throw new Error(error);
                     
        }
    }
}

export default new UserService()