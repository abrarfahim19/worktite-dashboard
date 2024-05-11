import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const Loader = ({ className }: { className?: string }) => {
  return (<div className="flex justify-center items-center">
      <Loader2
          className={cn('h-16 w-16 text-primary/60 animate-spin', className)}
      />
  </div>);
};

export const useLoader = (opt?:{isLoading?: boolean, data?:number})=>{
  if (opt){
    if(opt.isLoading){
      return <Loader />
    }
    if(opt?.data===0){
      return "no data found"
    }
  }
}