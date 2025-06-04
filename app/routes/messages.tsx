const messages = [
  { name: 'Alice', message: 'Happy Birthday! 🎉' },
  { name: 'Bob', message: 'Cheers to more memories!' }
];

export default function MessagesPage() {
  return (
    <div>
      <h2>💌 Birthday Messages</h2>
      {messages.map((msg, i) => (
        <p key={i}><strong>{msg.name}:</strong> {msg.message}</p>
      ))}
    </div>
  );
}
