export default function Stock() {
    return (

        <div className="flex flex-col items-center gap-[25px] text-white font-normal text-sm leading-[1.42857]"> 
            <input className="w-[282px] h-[32px] px-[6px] pt-[0px] pb-[2px] border border-2 rounded-[12px] border-custom-white min-h-[32px] p-[4px_6px]" type="text" placeholder="Enter your country"/>
            <input className="w-[282px] h-[32px] px-[6px] pt-[0px] pb-[2px] border border-2 rounded-[12px] border-custom-white min-h-[32px] p-[4px_6px]" type="text" placeholder="Enter symbol or name"/>

<div className="flex flex-row items-center justify-center gap-[25px] mt-20 mb-[300px]">
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
            #
        </p>
        <p>{}0</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Symbol
        </p>
        <p>{}0</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Name
        </p>
        <p>{}0</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Capitalization
        </p>
        <p>{}$</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Price
        </p>
        <p>{}USD</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Price change per day        </p>
        <p className="text-custom-green">{}%</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Price change per month        
        </p>
        <p className="text-custom-red">{}%</p>
    </div>
</div>

<div>
    
</div>
        </div>
    )
}