
// WhatsApp interfaces for API calls
export interface WhatsAppMessageRequest {
  to: string;
  content: string;
  mediaUrl?: string;
}

export interface WhatsAppConversationRequest {
  to: string;
  initialMessage: string;
}
