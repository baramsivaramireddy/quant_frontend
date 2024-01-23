
"use client"
import { useQuery } from "@tanstack/react-query";
import axiosInstance from '@/utils/axiosInstance';
import {useToken} from "@/hooks/useAuth";
import Loading from "@/components/Loading";
const QuestionsPage = () =>{
    const token = useToken()
    const getQuestion = async () =>{
        let response = await axiosInstance.get('/api/questions' ,{headers:{Authorization: `Bearer ${token}`}})
        return  response.data.data
      }
    const {isPending, isError, data:questions, error} = useQuery({
        queryKey:['questions'],
        queryFn:getQuestion
      })
      if (isPending) {
        return <Loading />
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }
    
      return (
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4">Questions</h1>
          <div className="space-y-4">
            {questions.map((q) => (
              <details key={q._id} className="border border-gray-300 p-4 rounded-md shadow-md">
                <summary className="cursor-pointer text-blue-500 text-lg font-semibold">{q.title}</summary>
                <div className="mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="font-bold">Difficulty:</label>
                    <span className="text-blue-500">{q.difficulty}</span>
                  </div>
                  <p className="text-lg font-bold mb-2">{q.type}</p>
                  <p className="text-sm mb-2">
                    {q.isPublished ? (
                      <span className="text-green-500">Published</span>
                    ) : (
                      <span className="text-red-500">Not Published</span>
                    )}
                  </p>
                  <p className="text-gray-500 mb-2">{q.category}</p>
                  <div className="mb-4">
                    <strong>Options:</strong>
                    {q.options.map((o, index) => (
                      <div key={index} className="bg-gray-100 p-2 rounded-md mb-1">
                        {o}
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <strong>Correct Options:</strong>
                    {q.correctOptions.map((o, index) => (
                      <div key={index} className="bg-green-100 p-2 rounded-md mb-1">
                        {o}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    <strong>Solution:</strong> {q.solution}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      );
      
}

export default QuestionsPage