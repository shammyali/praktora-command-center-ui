
import { TelegramMessage } from './types';

export const mockTelegramMessages: Record<string, TelegramMessage[]> = {
  "tg-1": [
    {
      id: "tgmsg-c1-1",
      content: "Hello, I'm looking for car insurance for my new Mazda CX-5",
      timestamp: "2023-05-22T12:28:00",
      isIncoming: true,
      type: "text",
      source: "Human"
    },
    {
      id: "tgmsg-c1-2",
      content: "Hi Fatima! I'd be happy to help you with a quote for your new Mazda CX-5. Could you please share the model year and your Emirates ID?",
      timestamp: "2023-05-22T12:29:00",
      isIncoming: false,
      type: "text"
    },
    {
      id: "tgmsg-c1-3",
      content: "It's a 2023 model, bought last month",
      timestamp: "2023-05-22T12:30:00",
      isIncoming: true,
      type: "text",
      source: "Human"
    },
    {
      id: "tgmsg-c1-4",
      content: "Need AXA quote for Mazda CX-5",
      timestamp: "2023-05-22T12:31:00",
      isIncoming: true,
      type: "text",
      source: "Human"
    },
    {
      id: "tgmsg-c1-5",
      content: "Here's my Emirates ID",
      timestamp: "2023-05-22T12:32:00",
      isIncoming: true,
      type: "image",
      source: "Human",
      attachmentUrl: "https://i.pravatar.cc/300?img=5",
      attachmentType: "image/jpeg",
      attachmentName: "Emirates ID.jpg"
    }
  ],
  "tg-2": [
    {
      id: "tgmsg-c2-1",
      content: "/quote",
      timestamp: "2023-05-22T11:40:00",
      isIncoming: true,
      type: "command",
      commandUsed: "/quote",
      source: "Human"
    },
    {
      id: "tgmsg-c2-2",
      content: "Please fill in the following form to get an instant quote:",
      timestamp: "2023-05-22T11:40:30",
      isIncoming: false,
      type: "text",
      source: "Bot"
    },
    {
      id: "tgmsg-c2-3",
      content: "User tapped: 🚗 Motor Insurance",
      timestamp: "2023-05-22T11:41:00",
      isIncoming: true,
      type: "button",
      buttonSelection: "Motor Insurance",
      source: "Human"
    },
    {
      id: "tgmsg-c2-4",
      content: "Form submission received",
      timestamp: "2023-05-22T11:45:00",
      isIncoming: true,
      type: "form",
      source: "Human",
      formData: {
        vehicleMake: "BMW",
        vehicleModel: "X5",
        vehicleYear: "2022",
        coverage: "Comprehensive",
        driverAge: "35",
        city: "Dubai"
      }
    }
  ]
  // The original had more conversations, but this is sufficient for the example
};
