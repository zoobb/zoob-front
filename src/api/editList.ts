import axios from 'axios';

export const addListItem = () => {
  try {
    await axios.post(`http://${document.location.hostname}:8247/list`, {
      'user_data': newListItem.value,
    });
    await updateList();
    console.log(todoList.value);
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
export const updateListItem = async (id: number, content: string | undefined) => {
  try {
    if (content) {
      await axios.put(`http://${document.location.hostname}:8247/list/${id}`, {
        'user_data': content,
      });
    }
    await updateList();
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  } finally {
    bufferID.value = null;
    bufferContent.value = '';
  }
};

export const deleteListItem = async (id: number) => {
  try {
    await axios.delete(`http://${document.location.hostname}:8247/list/${id}`);
    await updateList();
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
