
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [pin, setPin] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchPins() {
    try {
      const { data } = await axios.get(`${API_URL}/api/pin/all`,{withCredentials:true});
      setPins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/pin/${id}`);
      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await axios.put(`${API_URL}/api/pin/${id}`, {
        title,
        pin,
      });
      toast.success(data.message);
      fetchPin(id);
      setEdit(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update pin");
    }
  }

  async function addComment(id, comment, setComment) {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/pin/comment/${id}`,
        { comment }
      );
      toast.success(data.message);
      fetchPin(id);
      setComment("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add comment");
    }
  }

  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/pin/comment/${id}?commentId=${commentId}`
      );
      toast.success(data.message);
      fetchPin(id);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete comment");
    }
  }

  async function deletePin(id, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${API_URL}/api/pin/${id}`);
      toast.success(data.message);
      navigate("/");
      fetchPins();
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete pin");
      setLoading(false);
    }
  }

  async function addPin(
    formData,
    setFilePrev,
    setFile,
    setTitle,
    setPin,
    navigate
  ) {
    try {
      const { data } = await axios.post(`${API_URL}/api/pin/new`, formData);
      toast.success(data.message);
      setFile([]);
      setFilePrev("");
      setPin("");
      setTitle("");
      fetchPins();
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add pin");
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <PinContext.Provider
      value={{
        pins,
        loading,
        fetchPin,
        pin,
        updatePin,
        addComment,
        deleteComment,
        deletePin,
        addPin,
        fetchPins,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
