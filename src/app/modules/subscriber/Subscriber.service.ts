import { ISubscriber, Subscriber } from "./Subscriber.schema";

const createSubscriber = async (payload:ISubscriber) => {
        const isExist   = await Subscriber.findOne({email: payload.email});
        if(isExist) throw new Error("Email is already exist");
        const subscriber = await Subscriber.create(payload);
        return subscriber;
}

const getAllSubscriber = async (): Promise<ISubscriber[]> => {
    const subscribers = await Subscriber.find({});
    if (!subscribers || subscribers.length === 0)
        throw new Error("No subscriber found");
    return subscribers;
};

const deleteSubscriber = async (id: string): Promise<ISubscriber> => {
    const subscriber = await Subscriber.findByIdAndDelete(id);
    if (!subscriber) throw new Error("No subscriber found");
    return subscriber;
}

export const SubscriberService = {
    createSubscriber,
    getAllSubscriber,
    deleteSubscriber
};
