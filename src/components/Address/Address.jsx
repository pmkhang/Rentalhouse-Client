import React, { useEffect, useState } from 'react';
import SelectorAddress from './SelectorAddress';
import Input from '../Input';
import { apiGetPublicDistrict, apiGetPublicProvince, apiGetPublicWard } from '../../services/province';
import { memo } from 'react';

const Address = ({ setPayload, invalidField, setInvalidField, register, errors }) => {
  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataWards, setDataWards] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [addressFinal, setAddressFinal] = useState('');

  useEffect(() => {
    const fetchPublicProvince = async () => {
      try {
        const response = await apiGetPublicProvince();
        if (response.status === 200) {
          setDataProvinces(response?.data?.results);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      if (province) {
        try {
          const response = await apiGetPublicDistrict(province);
          if (response.status === 200) {
            setDataDistricts(response?.data?.results);
          }
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      }
    };
    province && fetchPublicDistrict();
    !province && setDataDistricts([]);
  }, [province]);

  useEffect(() => {
    setWard(null);
    const fetchPubliceWard = async () => {
      try {
        if (district) {
          const response = await apiGetPublicWard(district);
          if (response.status === 200) {
            setDataWards(response?.data?.results);
          } else {
            console.error('Error fetching ward');
          }
        }
      } catch (error) {
        console.error('Error fetching ward:', error);
      }
    };
    district && fetchPubliceWard();
    !district && setDataWards([]);
  }, [district]);

  useEffect(() => {
    const formattedAddress = `${address ? address + ',' : ''} ${
      ward ? dataWards?.find((i) => i?.ward_id === ward)?.ward_name + ',' : ''
    } ${district ? dataDistricts?.find((i) => i?.district_id === district)?.district_name + ',' : ''} ${
      province ? dataProvinces?.find((i) => i?.province_id === province)?.province_name + '.' : ''
    }`.trim();

    setAddressFinal(formattedAddress);

    setPayload((prev) => ({
      ...prev,
      address: formattedAddress,
      provinceName:
        `${province ? dataProvinces?.find((i) => i?.province_id === province)?.province_name : ''}`.trim() || '',
      districtName:
        `${district ? dataDistricts?.find((i) => i?.district_id === district)?.district_name : ''}`.trim() || '',
      provinceCode: province || '',
      districtCode: district || '',
    }));
  }, [address, dataDistricts, dataProvinces, dataWards, district, province, setPayload, setAddressFinal, ward]);

  return (
    <div className="w-full h-fit">
      <h2 className="font-semibold text-xl">Địa chỉ cho thuê</h2>
      <div className=" w-full flex flex-col gap-8">
        <Input
          type="text"
          label="Nhập địa chỉ cho thuê"
          labelStyle={'font-semibold'}
          id="address"
          inputStyle={'py-2 bg-white focus:border focus:border-blue-400'}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={'Nhập số nhà và đường'}
          className={'mt-5'}
          invalidField={invalidField}
          onFocus={() => setInvalidField([])}
          typeName="address"
        />
        <div className="w-full flex flex-col gap-4">
          <SelectorAddress
            label="Tỉnh/Thành phố"
            id="province"
            options={dataProvinces}
            value={province || 'a'}
            setValue={setProvince}
            type="province"
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
          <SelectorAddress
            label="Quận/Huyện"
            id="district"
            options={dataDistricts}
            value={district || 'a'}
            setValue={setDistrict}
            type="district"
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
          <SelectorAddress
            className={'flex-2'}
            label="Phường/Xã"
            id="ward"
            options={dataWards}
            value={ward || 'a'}
            setValue={setWard}
            type="ward"
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
        </div>
        <Input
          type="text"
          inputStyle={'py-2 bg-gray-200 focus:border focus:border-blue-400'}
          readOnly
          label="Xác nhận địa chỉ"
          id="exactly-address"
          labelStyle={'font-semibold'}
          value={addressFinal}
        />
      </div>
    </div>
  );
};

export default memo(Address);
