import { BASE_URL } from './config.js';

export const CreateTask = async (taskObj) => {
    const token = localStorage.getItem('token'); 
    const url = `${BASE_URL}/tasks`;
    console.log('url ', url)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const GetAllTasks = async () => {
    const token = localStorage.getItem('token'); 
    const url = `${BASE_URL}/tasks`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();

        if (!result.ok) throw new Error(data.message || 'Failed to fetch tasks');
        return data;
    } catch (err) {
        console.error('Frontend fetch error:', err); // <--- ADD THIS
        return { success: false, message: err.message };
    }
};

export const DeleteTaskById = async (id) => {
    const token = localStorage.getItem('token'); 
    const url = `${BASE_URL}/tasks/${id}`;
    console.log('url ', url)
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const UpdateTaskById = async (id, reqBody) => {
    const token = localStorage.getItem('token'); 
    const url = `${BASE_URL}/tasks/${id}`;
    console.log('url ', url)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}