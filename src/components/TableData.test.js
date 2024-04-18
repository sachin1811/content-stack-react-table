import TestRenderer from 'react-test-renderer';
import { TableData } from './TableData';
import { mockFetch } from '../../_mocks_/mock-fetch';
import { mockedData } from '../constants/Data';

describe("TableData Component",()=>{

    describe("TableData Component without data",()=>{
        let renderer;
        let instance;

        renderer = TestRenderer.create(
            <TableData dataPresent={false} />,
          );

          it("should make snapshot", () => {
            expect(renderer).toMatchSnapshot();
            });
    });

    describe("TableData Component with data",()=>{
        window.fetch = mockFetch(mockedData);
        const mockedFetch = window.fetch;
        let renderer;
        let instance;

        const { act } = TestRenderer;
        renderer = TestRenderer.create(
            <TableData />,
          );
          instance = renderer.root;

          it("should make snapshot",  () => {
          expect(renderer).toMatchSnapshot();
          });

          it("should make snapshot", async () => {
            let treeNode = instance.findByProps({id:"dynamicTable"});
            act(() => {
                treeNode.props.onScroll();
              });
              expect(mockedFetch).toHaveBeenLastCalledWith(true);
            });
    });
});