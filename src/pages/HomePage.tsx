
import React, { useState } from "react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("now-showing");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
            alt="Movie Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 backdrop-blur-sm"></div>
        </div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Experience Movies Like Never Before
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Book your tickets now for the ultimate cinema experience with premium seating and state-of-the-art sound.
          </p>
          <div className="animate-slide-up">
            <Link to="/movies">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2.5 rounded-full text-lg">
                <Ticket className="h-5 w-5 mr-2" />
                Book Tickets
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="now-showing" className="w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Movies</h2>
            <TabsList>
              <TabsTrigger value="now-showing" onClick={() => setActiveTab("now-showing")}>
                Now Showing
              </TabsTrigger>
              <TabsTrigger value="coming-soon" onClick={() => setActiveTab("coming-soon")}>
                Coming Soon
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="now-showing" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="coming-soon" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {/* We'll use the same movies data for now, but in a real app this would be different */}
              {movies.slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Promotions Section */}
      <div className="bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="p-6">
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Terrific Tuesdays</h3>
                <p className="text-muted-foreground mb-4">
                  All tickets at 30% off every Tuesday. Bring your friends and family!
                </p>
                <Link to="/offers">
                  <Button variant="link" className="text-primary p-0">
                    Learn More →
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="p-6">
                <Ticket className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Premium Membership</h3>
                <p className="text-muted-foreground mb-4">
                  Join our premium membership for exclusive benefits and discounts on every booking.
                </p>
                <Link to="/membership">
                  <Button variant="link" className="text-primary p-0">
                    Learn More →
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="p-6">
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Weekend Combo</h3>
                <p className="text-muted-foreground mb-4">
                  Special weekend combo with popcorn and drinks at reduced prices.
                </p>
                <Link to="/offers">
                  <Button variant="link" className="text-primary p-0">
                    Learn More →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Download Our Mobile App</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Get the best movie experience with our mobile app. Book tickets, check showtimes, and more - all on the go!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-black hover:bg-black/90 text-white">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5227 7.39601V8.92935C17.5227 9.03268 17.4364 9.11935 17.3331 9.11935H16.0372V10.4346C16.0372 10.538 15.9508 10.6246 15.8475 10.6246H14.3148C14.2115 10.6246 14.1251 10.538 14.1251 10.4346V9.11935H12.8292C12.7259 9.11935 12.6395 9.03268 12.6395 8.92935V7.39601C12.6395 7.29268 12.7259 7.20601 12.8292 7.20601H14.1251V5.89135C14.1251 5.78801 14.2115 5.70135 14.3148 5.70135H15.8475C15.9508 5.70135 16.0372 5.78801 16.0372 5.89135V7.20601H17.3331C17.4364 7.20601 17.5227 7.29268 17.5227 7.39601Z" fill="white"/>
                    <path d="M8.21939 15.1727H9.32104V12.9113H10.4227V15.1727H11.5243V11.8099H8.21939V15.1727Z" fill="white"/>
                    <path d="M5.65696 11.8096L4.6416 14.0712L3.64696 11.8096H2.47559L4.1416 15.3293L4.6416 16.3513L5.1416 15.3293L6.8076 11.8096H5.65696Z" fill="white"/>
                    <path d="M7.32104 13.5044C7.32104 14.3113 7.95437 14.9243 8.74129 14.9243C9.34129 14.9243 9.83496 14.6195 10.0885 14.1653L9.14771 13.6493C9.03496 13.8493 8.84129 13.9727 8.64771 13.9727C8.32104 13.9727 8.06271 13.7146 8.06271 13.386C8.06271 13.0579 8.32104 12.7998 8.64771 12.7998C8.82104 12.7998 9.01477 12.9035 9.14771 13.1035L10.0885 12.6066C9.83496 12.1728 9.34125 11.8685 8.74129 11.8685C7.95437 11.8494 7.32104 12.4623 7.32104 13.5044Z" fill="white"/>
                    <path d="M15.282 13.9919H15.3203C15.4331 13.9919 15.5267 13.8979 15.5267 13.7848V11.8091H16.4331V13.7848C16.4331 14.3782 16.0139 14.8557 15.4142 14.8557H15.1884C14.5892 14.8557 14.1699 14.3978 14.1699 13.7848V11.8091H15.0761V13.7848C15.0761 13.8979 15.1696 13.9919 15.282 13.9919Z" fill="white"/>
                    <path d="M17.4336 15.1724H18.3399V11.8096H17.4336V15.1724Z" fill="white"/>
                    <path d="M21.4908 12.8301H20.8149V12.0232C20.8149 11.9391 20.7599 11.8741 20.6662 11.8741H19.7599C19.6662 11.8741 19.6108 11.9391 19.6108 12.0232V12.8301H19.2668V13.6179H19.6108V15.1724H20.517V13.6179H21.1737V12.8301H20.517V12.6492C20.517 12.5652 20.572 12.5006 20.6662 12.5006H21.4908C21.4908 12.5006 21.4908 12.8301 21.4908 12.8301Z" fill="white"/>
                  </svg>
                  Play Store
                </Button>
                <Button className="bg-black hover:bg-black/90 text-white">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5414 12.191C17.5342 10.2504 18.7536 9.01113 18.8107 8.9569C17.9963 7.76768 16.7255 7.57624 16.2684 7.56394C15.0754 7.44341 13.9219 8.26341 13.3156 8.26341C12.6962 8.26341 11.7547 7.57624 10.7445 7.59677C9.4501 7.61723 8.24072 8.35349 7.56201 9.51565C6.16895 11.876 7.19641 15.3366 8.53187 17.2362C9.19826 18.1658 9.98002 19.2063 10.9902 19.1653C11.9745 19.1215 12.3361 18.5235 13.5291 18.5235C14.709 18.5235 15.0473 19.1653 16.0786 19.1394C17.1396 19.1215 17.8123 18.2033 18.4583 17.2658C19.2194 16.1705 19.5309 15.0956 19.544 15.0253C19.5176 15.0167 17.5496 14.1937 17.5414 12.191Z" fill="white"/>
                    <path d="M15.8387 6.39262C16.3738 5.73035 16.7411 4.82778 16.6489 3.9165C15.8676 3.94782 14.8885 4.43842 14.3328 5.08577C13.8403 5.65576 13.3999 6.59539 13.5057 7.47101C14.3727 7.53938 15.2847 7.04873 15.8387 6.39262Z" fill="white"/>
                  </svg>
                  App Store
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                alt="Mobile App"
                className="max-w-xs md:max-w-sm rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
