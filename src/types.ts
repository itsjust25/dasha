export interface DateOption {
    id: string;
    title: string;
    image: string;
    locations: string[];
    foodOptions?: string[];
    activities?: string[];
    hasOwnFood?: boolean;
    customInput?: boolean;
}

export interface DateSelection {
    category: string;
    location: string;
    foodOption?: string;
    activities: string[];
    bringOwnFood?: boolean;
    picnicFoodList?: string;
    comments: string;
    customImage?: string;
    passportImage?: string;
    date?: string;
}
