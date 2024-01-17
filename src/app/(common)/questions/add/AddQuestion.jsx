const AddQuestionComponet = () => {
  const categories = [
    {
      _id: "65a378252ec899ca03ca25a9",
      name: "quantitative aptitude",
      createdAt: "2024-01-14T05:59:01.612Z",
      updatedAt: "2024-01-14T05:59:43.902Z",
      __v: 0,
    },
  ];
  return (
    <>
      <RenderUi categories={categories} />
    </>
  );
};
export default AddQuestionComponet;

const RenderUi = (props) => {
  const { categories } = props;
  return (
    <>
      <div>
        {/* title */}
        <p> Add new question</p>
      </div>
      <div>
        {/* form  */}
        <form className="flex flex-col gap-5 p-5">
          <input type="text" placeholder="title" />
         <textarea placeholder="enter description">
             
         </textarea>

          <select>
            <option value={"easy"}> easy </option>
            <option value={"medium"}> medium </option>
            <option value={"hard"}> hard</option>
          </select>
          <select>
            <option value="multiplechoice">Multiple Choice</option>
            <option value="singlechoice">Single Choice</option>
            <option value="fillintheblank">Fill in the Blank</option>
            <option value="matching">Matching</option>
          </select>
            <select>
            {categories.map((c) => (<option key={c.id} value={c.id}> {c.name}</option>))}
            </select>


            <input type="checkbox"  / > 
            <textarea placeholder="enter solution">

            </textarea>

            
        </form>
      </div>
    </>
  );
};
