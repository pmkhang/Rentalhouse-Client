import React, { useEffect, useState } from 'react';
import SelectorAddress from './SelectorAddress';
import Input from '../Input';
import { apiGetPublicDistrict, apiGetPublicProvince } from '../../services/province';
import { memo } from 'react';

const Address = ({ setPayload }) => {
  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
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
    setAddressFinal(
      `${address && address + ','} ${
        district ? dataDistricts?.find((i) => i?.district_id === district)?.district_name + ',' : ''
      } ${province ? dataProvinces?.find((i) => i?.province_id === province)?.province_name + '.' : ''}`,
    );
  }, [address, dataDistricts, dataProvinces, district, province]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: addressFinal,
      province: `${province ? dataProvinces?.find((i) => i?.province_id === province)?.province_name + '.' : ''}`,
    }));
  }, [addressFinal, dataProvinces, province, setPayload]);

  return (
    <div className="w-full h-fit">
      <h2 className="font-semibold text-xl">Địa chỉ cho thuê</h2>
      <div className=" w-full flex flex-col gap-4">
        <div className="w-full flex items-center gap-4">
          <SelectorAddress
            label="Tỉnh/Thành phố"
            id="tinh_thanh"
            options={dataProvinces}
            value={province || 'a'}
            setValue={setProvince}
            type="province"
          />
          <SelectorAddress
            label="Quận/Huyện"
            id="quan_huyen"
            options={dataDistricts}
            value={district || 'a'}
            setValue={setDistrict}
            type="district"
          />
        </div>
        <Input
          type="text"
          label="Nhập địa chỉ"
          labelStyle={'font-semibold'}
          id="address"
          inputStyle={'py-2 bg-white focus:border focus:border-blue-400'}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={'Nhập số nhà, phường/xã'}
        />
        <Input
          type="text"
          inputStyle={'py-2 bg-gray-200 focus:border focus:border-blue-400'}
          readOnly
          label="Địa chỉ chính xác"
          id="exactly-address"
          labelStyle={'font-semibold'}
          value={addressFinal}
        />
      </div>
    </div>
  );
};

export default memo(Address);
