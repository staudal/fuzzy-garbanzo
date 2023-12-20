// App.tsx
import React from "react";
import Person from "./components/PersonComponent";

const App: React.FC = () => {
	return (
		<div>
			<Person name="John Doe" age={30} role="Developer" />
		</div>
	);
};

export default App;
