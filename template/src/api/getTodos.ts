export async function getTodos() {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = response.json();

	return data;
}
