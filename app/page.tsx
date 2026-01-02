import HeroSection from '@/components/home/HeroSection'
import SearchBar from '@/components/home/SearchBar'
import FeaturedProperties from '@/components/home/FeaturedProperties'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <SearchBar />
      </div>
      <FeaturedProperties />
    </>
  )
}