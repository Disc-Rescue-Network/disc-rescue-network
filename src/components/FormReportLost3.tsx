import React, { useState, useEffect, ChangeEvent } from "react";

interface FormReportLostProps {
    initialName: string;
    lastName: string;
    onBrandChange: (value: string) => void;
    onDiscNameChange: (value: string) => void;
}

const FormReportLost: React.FC<FormReportLostProps> = ({ initialName, lastName, onBrandChange, onDiscNameChange }) => {
    const [brands, setBrands] = useState<string[]>([]);
    const [discs, setDiscs] = useState<string[]>([]);

    useEffect(() => {        
        fetch("https://drn-api-v2.discrescuenetwork.com/brands")
            .then((response) => response.json())
            .then((data) => {
                const brandNames = data.data.map((brand: any) => brand.attributes.BrandName);
                setBrands(brandNames);
            })
            .catch((error) => {
                console.error("Error fetching brands:", error);
            });

        fetch("https://drn-api-v2.discrescuenetwork.com/discs")
            .then((response) => response.json())
            .then((data) => {
                const discNames = data.data.map((disc: any) => disc.attributes.DiscName);
                setDiscs(discNames);
            })
            .catch((error) => {
                console.error("Error fetching discs:", error);
            });
    }, []);

    const handleBrandChange = (event: ChangeEvent<HTMLInputElement>) => {
        onBrandChange(event.target.value);
    };

    const handleDiscNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        onDiscNameChange(event.target.value);
    };

    return (
        <div className="select-box-report">
            <div className="col-4 pe-0">
                <input
                    className="form-select-report"
                    placeholder="Brand"
                    onChange={handleBrandChange}
                    list="brands"
                />
                <datalist id="brands">
                    {brands.map((brand, index) => (
                        <option key={index} value={brand} />
                    ))}
                </datalist>
            </div>
            <div className="col-8 report-lost">
                <input placeholder={lastName} onChange={handleDiscNameChange} list="discs" />
                <datalist id="discs">
                    {discs.map((disc, index) => (
                        <option key={index} value={disc} />
                    ))}
                </datalist>
            </div>
        </div>
    );
}

export default FormReportLost;