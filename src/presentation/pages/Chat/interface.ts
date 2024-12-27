export interface ChatProps {
 id: string;
 name: string;
 messages: {
  type: string;
  content: string
 }[]
}
