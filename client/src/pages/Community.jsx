import React, { useEffect, useState } from 'react';
import { dummyPublishedImages } from '../assets/assets';
import Loading from './Loading';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Sparkles, User, ExternalLink } from 'lucide-react';

const Community = () => {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  const fetchImages = async () => {
    try {
      const { data } = await axios.get('/api/user/published-images');
      if (data.success) {
        setImages(data.images);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4 sm:p-6 lg:p-10 xl:px-16 w-full mx-auto h-screen overflow-y-scroll bg-[#F8F7FC] dark:bg-[#0B0A12] text-[#0F0C1B] dark:text-[#F4F2F8] transition-colors">
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9F6] dark:bg-[#151320] border border-[#7C3AED]/20 dark:border-white/10 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span className="text-[12px] font-mono tracking-wider text-[#7C3AED] uppercase">
            Community Showcase
          </span>
        </div>
        <h1 className="font-geist text-[28px] sm:text-[36px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] tracking-tight">
          Community Images
        </h1>
        <p className="text-[14px] text-[#645D75] dark:text-[#9C97AE] mt-1">
          Explore AI artwork created and shared by Propel users.
        </p>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 pb-12">
          {images.map((item, index) => (
            <a 
              key={index} 
              href={item.imageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group block bg-white dark:bg-[#151320] rounded-[16px] overflow-hidden border border-[#E5E2EE] dark:border-white/[0.08] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            >
              <div className="aspect-square w-full overflow-hidden bg-[#F4F3F8] dark:bg-[#0B0A12] relative">
                <img 
                  src={item.imageUrl} 
                  alt="AI Community Artwork" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                
                {/* External link indicator on hover */}
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Author Footer Badge */}
              <div className="p-3 bg-white dark:bg-[#151320] border-t border-[#E5E2EE] dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-full bg-[#EDE9F6] dark:bg-[#1E1730] border border-[#7C3AED]/20 text-[#7C3AED] dark:text-[#F4F2F8] flex items-center justify-center text-[10px] font-semibold shrink-0">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="text-[12px] font-medium text-[#0F0C1B] dark:text-[#F4F2F8] truncate">
                    {item.userName || 'Anonymous'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#7C3AED] px-1.5 py-0.5 rounded bg-[#7C3AED]/10 shrink-0">
                  AI Art
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] rounded-[20px] max-w-md mx-auto my-8">
          <Sparkles className="w-8 h-8 text-[#9C97AE] mx-auto mb-3" />
          <p className="text-[15px] font-medium text-[#0F0C1B] dark:text-[#F4F2F8]">No Images Available Yet</p>
          <p className="text-[13px] text-[#645D75] dark:text-[#9C97AE] mt-1">Be the first to publish an AI image to the community!</p>
        </div>
      )}
    </div>
  );
};

export default Community;
