import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { EmojiData, emojiIndex, Picker } from "emoji-mart";
import { FaPlus, FaSkullCrossbones } from "react-icons/fa";

type Props = {
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
	testid?: string;
};
const Input: FC<Props> = ({ message, setMessage, testid }) => {
	const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
	const handleAddEmoji = (emoji: EmojiData) => {
		const newMessage: string = colonToUnicode(`${message} ${emoji.colons}`);
		setMessage(newMessage);
		setEmojiPicker(false);
	};

	const colonToUnicode = (message: string) =>
		message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
			let newMessage = x;
			newMessage = newMessage.replace(/:/g, "");
			const emoji: any = emojiIndex.emojis[newMessage];
			if (typeof emoji !== "undefined") {
				const unicode: string = emoji.native;
				if (typeof unicode !== "undefined") return unicode;
			}
			newMessage = ":" + newMessage + ":";
			return newMessage;
		});
	return (
		<>
			{emojiPicker && (
				<Picker
					set="apple"
					style={{ width: "100%" }}
					onSelect={handleAddEmoji}
					title="Pick Emoji"
					emoji="point_up"
				/>
			)}
			<div className="input-element">
				<label htmlFor="add_message">
					<button onClick={() => setEmojiPicker(!emojiPicker)}>
						{emojiPicker ? <FaSkullCrossbones className="svg" /> : <FaPlus className="svg" />}
					</button>
				</label>
				<input
					type="text"
					className="add-message__content"
					data-testid={testid}
					value={message}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)}
					required
					minLength={5}
					maxLength={40}
					name="add_message"
				/>
			</div>
		</>
	);
};

export default Input;
