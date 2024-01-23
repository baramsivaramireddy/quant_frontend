"use client";
import { useForm, useFieldArray } from "react-hook-form";
  import { useQuery } from "@tanstack/react-query";
import axiosInstance from '@/utils/axiosInstance';
import {useToken} from "@/hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
const AddQuestionComponet = () => {
    const token = useToken()
    const [isLoading, setIsLoading] = useState(false)
    const getCategories = async () =>{
    let response = await axiosInstance.get('/api/categories' ,{headers:{Authorization: `Bearer ${token}`}})
    return  response.data.data
  }
  const { handleSubmit, watch, register,reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      difficulty: "",
      type: "",
      category: "",
      isPublished: "",
      solution: "",
      correctOptions: [],
      options: [],
    },
  });
  const {isPending, isError, data:categories, error} = useQuery({
    queryKey:['categories'],
    queryFn:getCategories
  })
  if (isPending) {
    return  <Loading />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  
 
  let QuestionType = watch("type");

  const onSubmit = async  (values) => {
     

    try{
      setIsLoading(true)
      let response = await axiosInstance.post('/api/questions' , values,{headers:{Authorization: `Bearer ${token}`}});
      console.log(response)
      if (response.status == 201) {

        reset()
        toast.success('question created successfully')
      }
      else{
        toast.error('error occured while creating a question')
      }
    }
    catch(err){

      console.log(`Error occured  while creating  a question ${err} `)
      toast.error("error occured")
      reset()
    }
    setIsLoading(false)
  };
  return (
    <>
      <RenderUi
        watch={watch}
        QuestionType={QuestionType}
        categories={categories}
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        isLoading = {isLoading}
      />
    </>
  );
};
export default AddQuestionComponet;

const RenderUi = (props) => {
  const { categories, isLoading, watch, handleSubmit, QuestionType, register, onSubmit } = props;

  return (
    <div className="container mx-auto mt-8">
      {isLoading && <Loading />}
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Add New Question</h1>
      </div>
      <div className="bg-white p-8 rounded-md shadow-md">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="flex flex-col">
            <label className="font-bold">Title:</label>
            <input type="text" {...register("title")} placeholder="Title" className="border p-2 rounded-md" />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="font-bold">Description:</label>
            <textarea placeholder="Enter description" {...register("description")} className="border p-2 rounded-md" />
          </div>

          {/* Difficulty */}
          <div className="flex flex-col">
            <label className="font-bold">Difficulty:</label>
            <select {...register("difficulty")} className="border p-2 rounded-md">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="font-bold">Type:</label>
            <select {...register("type")} className="border p-2 rounded-md">
              <option value="multiplechoice">Multiple Choice</option>
              <option value="singlechoice">Single Choice</option>
              <option value="fillintheblank">Fill in the Blank</option>
              <option value="matching">Matching</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-bold">Category:</label>
            <select {...register("category")} className="border p-2 rounded-md">
              {categories.map((c, index) => (
                <option key={index} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Options and Correct Options */}
          <OptionsAndcorrectOptions QuestionType={QuestionType} register={register} watch={watch} />

          {/* is Published */}
          <div className="flex gap-2">
           
            <input {...register("isPublished")} type="checkbox" className="mt-1" />
            <label className="font-bold">Is Published</label>
          </div>

          {/* Solution */}
          <div className="flex flex-col">
            <label className="font-bold">Solution</label>
            <textarea placeholder="Enter solution" {...register("solution")} className="border p-2 rounded-md" />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              disabled={isLoading}
              className="disabled:opacity-25 hover:bg-blue-700 bg-blue-500 p-3 rounded text-white font-bold uppercase"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const OptionsAndcorrectOptions = (props) => {
  const { QuestionType, register, watch } = props;
  return (
    <>
      {QuestionType === "fillintheblank" && (
        <Fillintheblank register={register} watch={watch} />
      )}

      {QuestionType === "multiplechoice" && (
        <Multiplechoice register={register} watch={watch} />
      )}
      {QuestionType === "singlechoice" && (
        <SingleChoice register={register} watch={watch} />
      )}
      {QuestionType === "matching" && (
        <Matching register={register} watch={watch} />
      )}
    </>
  );
};

const Fillintheblank = (props) => {
  const { register } = props;
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">Answer</label>
      <input
        type="text"
        {...register("correctOptions.0")}
        placeholder="Enter the answer"
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

const Multiplechoice = (props) => {
  const { register, watch } = props;
  const options = watch("options");

  return (
    <div className="mb-4">
      <p className="font-bold mb-2">Options:</p>
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="mb-3">
          <label className="block mb-1">{`Option ${index + 1}`}</label>
          <input
            {...register(`options.${index}`)}
            className="border p-2 rounded-md w-full"
          />
        </div>
      ))}
      <div>
        <label className="block font-bold mb-2">Correct Option(s):</label>
        <select {...register("correctOptions")} multiple className="border p-2 rounded-md w-full">
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const SingleChoice = (props) => {
  const { register, watch } = props;
  const options = watch("options");

  return (
    <div className="mb-4">
      <p className="font-bold mb-2">Options:</p>
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="mb-3">
          <label className="block mb-1">{`Option ${index + 1}`}</label>
          <input
            {...register(`options.${index}`)}
            className="border p-2 rounded-md w-full"
          />
        </div>
      ))}
      <div>
        <label className="block font-bold mb-2">Correct Option(s):</label>
        <select {...register("correctOptions.0")} className="border p-2 rounded-md w-full">
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


const Matching = (props) => {
  const { register, watch } = props;

  let options = watch("options");

  let leftOptions = options.slice(0, 4);
  let rightOptions = options.slice(4);

  return (
    <>
      <div>
        <p className="font-bold mb-2">Matching options:</p>
        <div className="flex flex-row gap-5">
          <div>
            <div className="flex flex-col">
              <label>Left 1</label>
              <input {...register("options.0")} className="border p-2 rounded-md w-full" />
            </div>
            <div className="flex flex-col">
              <label>Left 2</label>
              <input {...register("options.1")} className="border p-2 rounded-md w-full" />
            </div>
            <div className="flex flex-col">
              <label>Left 3</label>
              <input {...register("options.2")} className="border p-2 rounded-md w-full" />
            </div>
            <div className="flex flex-col">
              <label>Left 4</label>
              <input {...register("options.3")} className="border p-2 rounded-md w-full" />
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              <label>Right 1</label>
              <input {...register("options.4")} className="border p-2 rounded-md w-full" />
            </div>
            <div className="flex flex-col">
              <label>Right 2</label>
              <input {...register("options.5")} className="border p-2 rounded-md w-full" />
            </div>
            <div className="flex flex-col">
              <label>Right 3</label>
              <input {...register("options.6")} className="border p-2 rounded-md w-full" />
            </div>
            <div className="flex flex-col">
              <label>Right 4</label>
              <input {...register("options.7")} className="border p-2 rounded-md w-full" />
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Correct matching */}
        <p className="font-bold mb-2">Correct options</p>
        <div className="flex flex-row gap-5">
          <div>
            <div className="flex flex-col">
              <label>Left 1</label>
              <select {...register("correctOptions.0")} className="border p-2 rounded-md w-full">
                {leftOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label>Left 2</label>
              <select {...register("correctOptions.1")} className="border p-2 rounded-md w-full">
                {leftOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label>Left 3</label>
              <select {...register("correctOptions.2")} className="border p-2 rounded-md w-full">
                {leftOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label>Left 4</label>
              <select {...register("correctOptions.3")} className="border p-2 rounded-md w-full">
                {leftOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label>Right 1</label>
              <select {...register("correctOptions.4")} className="border p-2 rounded-md w-full">
                {rightOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label>Right 2</label>
              <select {...register("correctOptions.5")} className="border p-2 rounded-md w-full">
                {rightOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label>Right 3</label>
              <select {...register("correctOptions.6")} className="border p-2 rounded-md w-full">
                {rightOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label>Right 4</label>
              <select {...register("correctOptions.7")} className="border p-2 rounded-md w-full">
                {rightOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
