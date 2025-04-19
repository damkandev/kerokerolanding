import Image from "next/image";

export default function Home() {
  return (
    <div className="header grid grid-cols-2 gap-4">
      <section>
        <div className="flex flex-col justify-center bg-[#030B07 border border-[#9BFFB1] rounded-[15px] ">
          <h1 className="text-[#9BFFB1]">Whatever you need, we do it.</h1>
          <p className="text-[#D3FFDD]">
            We have been developing software tailored to your needs for years,
            always trying to make your company's workflow much more efficient.
          </p>
          <div></div>
        </div>
        <div className="flex items-center justify-center">imagen</div>
      </section>
    </div>
  );
}
