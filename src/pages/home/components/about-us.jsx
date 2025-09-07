export default function AboutUs() {
  return (
    <section className="bg-blue-600">
      <div className="mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left: Teddy Image */}
        <div className="flex-1">
          <img
            src="/home-bg.png"
            alt="Teddy Toy"
            className="h-auto"
          />
        </div>

        {/* Right: Text */}
        <div className="flex-1 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            About ToyKart
          </h2>
          <p className="mb-4 text-sm md:text-xl">
            At ToyKart, we bring the best Indian toys to your doorstep. Our
            mission is to provide safe, educational, and fun toys for children
            of all ages while supporting local artisans.
          </p>
          <p className="text-sm md:text-xl">
            From handcrafted wooden dolls to brain-stimulating puzzles, every
            product is selected with care to ensure quality, creativity, and
            joy for your little ones.
          </p>
        </div>
      </div>
    </section>
  );
}
