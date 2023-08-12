import logo from './logo.svg';
import './App.css';
import './scss/App.scss'
import { useState, useEffect } from 'react';






function App() {

	const [prompt, setPrompt] = useState('')
	const [loading, setLoading] = useState(false)
	  


	const onGenerateHandler = () => {
		setLoading(true)
		// Data to be sent in the POST request
		const postData = {
			prompt: prompt,
		};
		
		// URL of the API endpoint
		const apiUrl = 'https://64.247.206.233:46385/predict';
		
		// Configuration for the fetch POST request
		const requestOptions = {
			method: 'POST',
			headers: {
		    'Content-Type': 'application/json',
			mode: 'no-cors',
		},
		body: JSON.stringify(postData),
	  };
	  
		// Make the POST request using fetch
		fetch(apiUrl, requestOptions)
			.then(response => response.json()) // Parse the response body as JSON
			.then(data => {
			let final_text = data.response
			const assistantSections = data.response.match(/###Assistant:.*?###/gs);
			// Iterate over the extracted sections and log each one
			if (assistantSections) {
			
			assistantSections.forEach((section, index) => {
				if(index==0){
					final_text = section
				}
				
			});
			}
			setPrompt(final_text)
			setLoading(false)
		})
			.catch(error => {
			console.error('Error:', error); // Handle any errors
			});
			
	  }	



	return (
	<div>
		<div class="area" >
			<ul class="circles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
			</ul>
		</div >
		<div class="context">
			<h1>CodeDoc (Beta)</h1>
			{loading
			? <div class="loading-container">
			<div class="loading-circle"></div>
		  </div>
		  : <>
		  <div class="input-container">
			<textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} class="elegant-text-input" placeholder="Enter your text here"></textarea>
			<button onClick={onGenerateHandler} class="elegant-button">Click Me</button>
			</div>
		  </>
		}
			
		</div>
	</div>
	);


}

	


export default App;
